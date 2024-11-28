const cron = require('node-cron');
const { getTopArtists } = require('../services/billboardService');
const { generateBetEvent } = require('../services/llmService');
const BetEvent = require('../models/BetEvent');

let generatedBetCount = 0; // Track how many bets have been generated

cron.schedule('* * * * *', async () => {
  try {
    // Check the total number of bet events in the database
    const totalBets = await BetEvent.countDocuments({});

    // Limit the total number of bet events to 10
    if (totalBets >= 10 || generatedBetCount >= 10) {
      console.log('Maximum number of bets generated. No more bets will be created.');
      return;
    }

    const artistsInTop100 = await getTopArtists();

    // Get Top 10 artists
    const artistsInTop10 = artistsInTop100.slice(0, 10);

    // Define a comprehensive list of popular artists
    const allArtists = [
      'Taylor Swift',
      'Drake',
      'Kanye West',
      'Adele',
      'Ed Sheeran',
      'Beyoncé',
      'Rihanna',
      'Justin Bieber',
      'Bruno Mars',
      'Katy Perry',
      'Lady Gaga',
      'Ariana Grande',
      'Billie Eilish',
      'Shawn Mendes',
      'Sam Smith',
      'The Weeknd',
      'Post Malone',
      'Dua Lipa',
      'Harry Styles',
      'Miley Cyrus',
      'Nicki Minaj',
      'Cardi B',
      'Lil Nas X',
      'Doja Cat',
      'Lizzo',
      'Halsey',
      'Khalid',
      'Imagine Dragons',
      'Maroon 5',
      'Coldplay',
      'Ken Carson',
      // Add more artists as needed
    ];

    // Filter out artists already in the Top 10
    const eligibleArtists = allArtists.filter(
      (artist) => !artistsInTop10.includes(artist)
    );

    if (eligibleArtists.length < 2) {
      console.log('Not enough eligible artists to generate a bet event.');
      return;
    }

    // Use the LLM to generate a bet event
    const betEventData = await generateBetEvent(eligibleArtists);

    if (
      !betEventData ||
      !betEventData.topic ||
      !betEventData.artists ||
      !betEventData.blurb
    ) {
      console.error('Invalid data received from LLM:', betEventData);
      return;
    }

    // Calculate odds
    const odds = {
      [betEventData.artists[0]]: 1.8,
      [betEventData.artists[1]]: 2.0,
    };

    // Check if the event already exists
    const existingEvent = await BetEvent.findOne({
      topic: betEventData.topic,
      'options.0': betEventData.artists[0],
      'options.1': betEventData.artists[1],
    });

    if (existingEvent) {
      console.log('Bet event already exists:', existingEvent);
      return;
    }

    // Save the bet event
    const betEvent = new BetEvent({
      topic: betEventData.topic,
      options: betEventData.artists,
      blurb: betEventData.blurb,
      odds,
    });

    await betEvent.save();
    generatedBetCount++; // Increment the generated bet counter

    console.log('Generated new bet event:', betEvent);
  } catch (error) {
    console.error('Failed to generate bet event:', error);
  }
});
