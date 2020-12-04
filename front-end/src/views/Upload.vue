<template>
<div class="upload">
	<h1>Add Songs Page!</h1>
	<form v-on:submit.prevent="addSong">
		<input type="text" v-model="newTitle" placeholder="Title">
		<input type="text" v-model="newArtist" placeholder="Artist">
		<input type="text" v-model="newAlbum" placeholder="Album">
		<input type="text" v-model="newGenre" placeholder="Genre">
		<button type="submit">Add</button>
	</form>
	<ul>
		<li v-for="song in songs" v-bind:key="song._id">
			{{song.title}} -{{song.artist}}     {{song.album}}     {{song.genre}}
		</li>
	</ul>
</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'Upload',
	data() {
		return {
			file: null,
			addItem: null,
			newTitle: "",
			newArtist: "",
			newAlbum: "",
			newGenre: "",
			songs: [
				{ title: "Sugar Town", artist: "Nancy Sinatra", album: "Sugar", genre: "Pop" },
				{ title: "Beast of Burden", artist: "The Rolling Stones", album: "40 Licks", genre: "Rock" },
			],
		}
	},
	methods: {
		addSong() {
			var url = "/api/songs";
			axios.post(url, {
				title: this.newTitle,
				artist: this.newArtist,
				album: this.newAlbum,
				genre: this.newGenre
			})
			.then(response => {
				console.log("Post Response ");
				console.log(response.data);
				this.songs.push(response.data);
			})
			.catch(e => {
				console.log(e);
			});
			console.log(this.songs);
			this.newTitle = "";		
			this.newArtist = "";		
			this.newAlbum = "";		
			this.newGenre = "";
		},
		fileChanged(event) {
			this.file = event.target.files[0];
		},
	}
}
</script>
