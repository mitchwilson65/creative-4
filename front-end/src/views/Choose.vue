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
		<br>
		<div class="suggestions" v-if="suggestions.length > 0">
			<div class="suggestion" v-for="sug in suggestions" :key="sug._id" @click="selectSong(sug)">{{sug.title}} -{{sug.artist}}, {{sug.album}}, {{sug.genre}}</div>
		</div>
		<div class="sorry" v-if="suggestions.length === 0">
			<p>We're sorry, this song is not downloaded.  Please talk to our administrator about adding it:)</p>
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
			songs: [],
			list: [],
		}
	},
	created() {
		this.getSongs();
	},
	computed: {
		suggestions() {
			let songs = this.songs.filter(song => 
			song.title.toLowerCase().startsWith(this.findTitle.toLowerCase()) &&
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
		async chooseSong() {
			var url = "/api/list";
			axios.post(url, {
				title: this.findSong.title,
				artist: this.findSong.artist,
				album: this.findSong.album,
				genre: this.findSong.genre,
			})
			.then(response => {
				console.log("Post Response ");
				console.log(response.data);
				this.songs.push(response.data);
			})
			.catch(e => {
				console.log(e);
			});
			console.log(this.list);
			this.findSong = null;		
			this.getSongs();	
		},
		fileChanged(event) {
			this.file = event.target.files[0];
		},
	}
}
</script>
