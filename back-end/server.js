const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const multer = require('multer');
const debug_server = require('debug')('pt:server');
const debug_puppy = require('debug')('pt:api:puppy');
const debug_bathroom = require('debug')('pt:api:bathroom');
const debug_walk = require('debug')('pt:api:walk');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// connect to the database
mongoose.connect('mongodb://localhost:27017/puppy_tracker', {
  useNewUrlParser: true
});
debug_server('Connected to DB')

const upload = multer({
  dest: '/var/www/images/creative4.mattrobdev.com/',
  limits: {
    fileSize: 10000000
  }
});

const puppySchema = new mongoose.Schema({
  name: String,
  birthday: Date,
  breed: [String],
  image: String,
  owners: [String],
});

const bathroomSchema = new mongoose.Schema({
  date: Date,
  poop: Boolean,
  pee: Boolean,
  puppy_id: mongoose.Schema.Types.ObjectId,
})

const walkSchema = new mongoose.Schema({
  date: Date,
  distance: Number,
  distance_unit: String,
  location: String,
  puppy_id: mongoose.Schema.Types.ObjectId
})

const Puppy = mongoose.model('Puppy', puppySchema);
const Bathroom = mongoose.model('Bathroom', bathroomSchema);
const Walk = mongoose.model('Walk', walkSchema);

// Photo Endpoints
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  if (!req.file) {
    return res.sendStatus(400)
  }
  debug_server(`Uploading photo to /var/www/images/${req.file.filename}`)
  res.send({
    path: `/var/www/images/${req.file.filename}`
  })
})

// Puppy Endpoints
app.get('/api/puppies', async (req, res) => {
  debug_puppy('GET\t/api/puppies')
  try {
    const puppies = await Puppy.find()
    debug_puppy('Successfully retrieved all puppies from DB')
    res.send(puppies)
  } catch (error) {
    debug_puppy(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.get('/api/puppies/:id', async (req, res) => {
  const { id } = req.params
  debug_puppy(`GET\t/api/puppies/${id}`)
  try {
    const pup = await Puppy.findById(id)
    debug_puppy(`Successfully retrieved ${pup.name} (id: ${id}) from DB`)
    res.send(pup)
  } catch (error) {
    debug_puppy(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.post('/api/puppies', async (req, res) => {
  const { name, birthday, breed, image, owners } = req.body
  debug_puppy(`POST\t/api/puppies/\nBODY: ${req.body}`)
  const puppy = new Puppy({
    name,
    birthday: new Date(birthday),
    breed,
    image,
    owners,
  })
  try {
    await puppy.save()
    debug_puppy(`Successfully added new puppy, ${name}, to DB`)
    res.send(puppy)
  } catch (error) {
    debug_puppy(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.put('/api/puppies/:id', async (req, res) => {
  const { id } = req.params
  const { name, birthday, breed, image, owners } = req.body
  debug_puppy(`PUT\t/api/puppies${id}\nBODY: ${req.body}`)
  try {
    const puppy = await Puppy.findById(id)
    puppy.name = name || puppy.name;
    puppy.birthday = birthday || puppy.birthday;
    puppy.breed = breed || puppy.breed;
    puppy.image = image || puppy.image;
    puppy.owners = owners || puppy.owners;
    await puppy.save();
    debug_puppy(`Successfully updated new puppy, ${name} (id: ${id}), to DB`)
    res.send(puppy);
  } catch (error) {
    debug_puppy(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.delete('/api/puppies/:id', async (req, res) => {
  const { id } = req.params
  debug_puppy(`DELETE\t/api/puppies/${id}`)
  try {
    await Puppy.deleteOne({_id: id})
    debug_puppy(`Successfully deleted puppy ${id}`)
    res.sendStatus(200)
  } catch (error) {
    debug_puppy(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

// Bathroom Endpoints
app.get('/api/bathrooms', async (req, res) => {
  debug_bathroom(`GET\t/api/bathrooms`)
  try {
    const bathrooms = await Bathroom.find()
    debug_bathroom('Successfully retrieved all bathrooms from DB')
    res.send(bathrooms)
  } catch (error) {
    debug_bathroom(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.get('/api/puppies/:id/bathrooms', async (req, res) => {
  const { id } = req.params
  debug_bathroom(`GET\t/api/puppies/${id}/bathrooms`)
  try {
    const bathrooms = await Bathroom.find({puppy_id: id})
    debug_bathroom(`Successfully retrieved all bathrooms for puppy ${id}`)
    res.send(bathrooms)
  } catch (error) {
    debug_bathroom(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.post('/api/puppies/:id/bathrooms', async (req, res) => {
  res.sendStatus(501)
})

app.put('/api/bathrooms/:id', async (req, res) => {
  res.sendStatus(501)
})

app.delete('/api/bathrooms/:id', async (req, res) => {
  res.sendStatus(501)
})

// Puppy Endpoints
app.get('/api/walks', async (req, res) => {
  debug_walk('GET\t/api/walks')
  try {
    const walks = await Walk.find()
    debug_walk('Successfully retrieved all walks from DB')
    res.send(walks)
  } catch (error) {
    debug_walk(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.get('/api/puppies/:id/walks', async (req, res) => {
  const { id } = req.params
  debug_walk(`GET\t/api/puppies/${id}/walks`)
  try {
    const walks = await Walk.find({puppy_id: id})
    debug_walk(`Successfully retrieved all walks from puppy ${id}`)
    res.send(walks)
  } catch (error) {
    debug_walk(`ERROR :: ${error}`)
    res.sendStatus(500)
  }
})

app.post('/api/puppies/:id/walks', async (req, res) => {
  res.sendStatus(501)
})

app.put('/api/walks/:id', async (req, res) => {
  res.sendStatus(501)
})

app.delete('/api/walks/:id', async (req, res) => {
  res.sendStatus(501)
})

app.listen(3001, () => debug_server('Server listening on port 3001'));