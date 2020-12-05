<template>
<div class="home">
	<p>NOW PLAYING: </p>
	<ul>
		<li v-for="song in list" :key="song._id">
			{{song.title}} -{{song.artist}}, {{song.album}}, {{song.genre}}
		</li>
	</ul>
</div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
	return {
		list: [],
	}
  }, 
  created() {
	this.getSongs();
  },
  methods: {
	async getSongs() {
		try {
			let response = await axios.get("/api/songs");
			this.list = response.data;
			return true;
		} catch(error) {
			console.log(error);
		}
	},
  },
}
</script>
