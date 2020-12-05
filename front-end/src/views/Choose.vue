<template>
<div class="choose">
	<h1>Choose Song!</h1>
	<div class="form">
		<input v-model="findTitle" placeholder="Search Titles">
		<input v-model="findArtist" placeholder="Search Artists">
		<input v-model="findAlbum" placeholder="Search Albums">
		<input v-model="findGenre" placeholder="Search Genres">
		
		<div class="selected" v-if="findSong">
			{{findSong.title}} -{{findSong.artist}}, {{findSong.album}}, {{findSong.genre}}
			<button @click="chooseSong">Choose Song</button>
		</div>
		<div class="suggestions">
			<div class="suggestion" v-for="sug in suggestions" :key="sug._id" @click="selectSong(sug)">{{sug.title}} -{{sug.artist}}, {{sug.album}}, {{sug.genre}}</div>
		</div>
	</div>
</div>
</template>

<script>
import axios from 'axios';
export default {
	name: 'Choose',
	data() {
		return {
			findSong: null,	
			findTitle: "",
			findArtist: "",
			findAlbum: "",
			findGenre: "",
			list: [],
			songs: [],
		}
	},
	created() {
		this.getSongs();
	},
	computed: {
		suggestions() {
			let songs = this.songs.filter(song => song.title.toLowerCase().startsWith(this.findTitle.toLowerCase()) &&
			song.artist.toLowerCase().startsWith(this.findArtist.toLowerCase()) &&
			song.album.toLowerCase().startsWith(this.findAlbum.toLowerCase()) &&
			song.genre.toLowerCase().startsWith(this.findGenre.toLowerCase()));
			return songs.sort((a,b) => a.title > b.title);
		}
	},
	methods: {
		async getSongs() {
			try {
				let response = await axios.get("/api/songs");
				this.songs = response.data;
				return true;
			} catch(error) {
				console.log(error);
			}
		},
		selectSong(song) {
			this.findTitle = "";
			this.findArtist = "";
			this.findAlbum = "";
			this.findGenre = "";
			this.findSong = song;
		},
		chooseSong() {
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
				this.list.push(response.data);
			})
			.catch(e => {
				console.log(e);
			});
			console.log(this.list);
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
