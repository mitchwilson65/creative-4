<template>
<div class="home">
	<p>NOW PLAYING: </p>
	<ul>
		<li v-for="song in songs" :key="song._id">
			{{song.title}} -{{song.artist}}, {{song.album}}, {{song.genre}}
		</li>
	</ul>
	<button @click="songOver()">Song Over</button>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
	return {
		file: null,
		songs: [],
	}
  }, 
  created() {
	this.getSongs();
  },
  methods: {
	async getSongs() {
		try {
			let response = await axios.get("/api/list");
			this.songs = response.data;
			return true;
			} catch(error) {
			console.log(error);
		}
	},
	async songOver() {
		try {
			await axios.delete("/api/list");
			this.getSongs();
			return true;
		} catch(error) {
			console.log(error);
			}
	},
	fileChanged(event) {
		this.file = event.target.files[0];
	}, 
  },
}
</script>
