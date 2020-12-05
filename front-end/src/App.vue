<template>
<div id="app">
  <div class="header">
    <div class="heading">
      <h1 id="top">Be a Jukebox Hero.</h1> 
    </div>
    <div class="logo">
        <img src="/musiclogo.png">
    </div>
  </div>
  <div class="footer">
    <router-link to="/">Home</router-link>
    <router-link to="/choose">Choose Song</router-link>
    <router-link to="/upload">Upload (Admin only)</router-link>
    <router-link to="/edit">Edit (Admin only)</router-link>
  </div>
  <div class="content">
    <router-view />
  </div>
</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  font-size: 15px;
  padding: 0px;
  margin: 0px;
  background-color: #E5E5E5;
}

/* Header */
.header {
  display: flex;
  padding: 20px 100px 0px 100px;
  background-color: black;
  color: #03F5F5;
}

.heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.content {
  padding: 20px 100px;
  min-height: 500px;
}

/* Footer */
.footer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;    
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #F5037C;
  font-size: 25px;
  font-family: 'Teko', sans-serif;
}

.footer a {
  color: #000;
}

h1 {
  margin-top: 30px;
  font-size: 40px;
}

#top {
  font-size: 55px;
}

h2 {
  font-size: 14px;
}
</style>
