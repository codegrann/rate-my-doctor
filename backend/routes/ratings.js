// Fetching a hospital's ratings
app.get('/api/ratings/:hospitalName', async (req, res) => {
    try {
      const ratings = await HospitalRating.find({ hospitalName: req.params.hospitalName });
      res.json(ratings);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch ratings' });
    }
  });
  
//   Adding a new rating
  app.post('/api/ratings', async (req, res) => {
    console.log('Rating API called');
    const { hospitalName, overallRating, facilities, location, safety, staff, cleanliness, comments } = req.body;
    try {
      const newRating = new HospitalRating({
        hospitalName,
        overallRating,
        facilities,
        location,
        safety,
        staff,
        cleanliness,
        comments,
      });
      await newRating.save();
      res.status(201).json({ message: 'Rating added successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to add rating' });
    }
  });
  