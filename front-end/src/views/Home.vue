<template>
  <div class="home">
    <div class="hero-image">
      <div class="hero-text">
        <h1>Welcome to Puppy Tracker!</h1>
      </div>
    </div>
    <div class="content">
      <h1>Our Goal</h1>
      <p>
        Here at Puppy Tracker, we want you to have the very best experience with your new puppy as possible. We understand that the new pup is going to have lots of challenges and you as their owner are going to need some help keeping everything straight. We hope that this application will help everyone and anyone do just that. We believe that with the help of Puppy Tracker, you will have an incredibly easy time training your new puppy and keeping track of him/her.
      </p>
      <h1>Potty Training</h1>
      <p>
        One of the main things that Puppy Tracker will help you with is potty training. Often there are multiple people who will take your puppy out to use the restroom outside. This can get very frustrating without constant communication between all of these people. This is because you don't always know when your puppy was taken out last and whether they went to the bathroom when they did. Luckily, Puppy Tracker is here to help. In one place, you will be able to see a history of when your puppy went to the bathroom, whether they went pee or poop or both, and whether it was inside or outside. We imagine that with this tool, potty training will become much less difficult and your puppy will be much happier!
      </p>
      <h1>Tracking walks</h1>
      <p>
        Many new puppies have a lot of energy, often referred to as puppy energy. This energy can often be let out through going on walks. However, you don't want to tire your puppy out too much. At the same time, you want to make sure that he gets enough exercies. Similar to the potty problem we talked about above, Puppy Tracker will help you solve this issue as well! We will help you keep track of when, where, and how far your puppy walks. You will be able to see a history as well of these walks so you know when your little one needs to go out and get some more exercies.
      </p>
      <h1>Thanks for your support!</h1>
      <p>
        We thank you for your support and hope that you enjoy using Puppy Tracker. Feel free to see the <a href="https://github.com/mattrobertson14/cs260-creative4" class="external" target="_blank">GitHub Project</a> here.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style scoped>
.home {
  box-sizing: border-box;
  height: 100%;
}

.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url("/puppies.jpg");
  height: 50%;

  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.home .content {
  max-width: 800px;
  margin: 0px auto;
  padding-bottom: 64px;
} 

.home a {
  color: var(--color-primary-dark);
  text-decoration: none;
}

.home .content h1 {
  text-align: center;
}

@media only screen and (max-width: 750px) {
  .home .content {
    padding: 0px 12px;
  }
}
</style>