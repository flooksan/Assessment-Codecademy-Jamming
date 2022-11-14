// import logo from './logo.svg';
import './App.css';
import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);

    // 31.Inside of the App component, set a hard-coded initial value for this.state.searchResults 
    // (it will be an array containing track objects).
    this.state = { //create state object include searchResults : [ {name1,artist1,album1,id1},{name2,artist2,album2,id2} ]
      // searchResults: [
      //   { name: 'Killing in the Name',artist: 'Rage Against the Machine',album: 'Rage Against the Machine',id: 9 },
      //   { name: 'I Shot The Sheriff',artist: 'Eric Clapton',album: 'Burnin(Bob Marley and the Wailers)',id: 10 },
      //   { name: 'เจ้าสาวไฉไล',artist: 'อภิรมย์',album: 'Apirome',id: 19 },
      //   { name: 'ยิ้มมา (Crush)',artist: 'BOWKYLION - ',album: 'Lionheart',id: 37 }

      // ],
      searchResults: [],

      playlistName: '',
      // playlistTracks: [
      //   { name: 'Killing in the Name',artist: 'Rage Against the Machine',album: 'Rage Against the Machine',id: 9 },
      //   { name: 'เจ้าสาวไฉไล',artist: 'อภิรมย์',album: 'Apirome',id: 19 }
      // ]
      playlistTracks: []

    }

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }

  //addTrack 
  addTrack(track) {
    const prevPlaylist = this.state.playlistTracks
    if (prevPlaylist.find(savedTrack => savedTrack.id === track.id)) {
      console.warn('Your add duplicate songs!!');
    }
    else {
      // alert(`Add new song : ${track.name} - ${track.artist}`)
      // Add new track to playlistTracks
      prevPlaylist.push(track)
      // สั่งให้มัน setState ภายใน playlistTracks อีกครั้งเพราะเราพึ่งเพิ่มค่าเข้าไป
      this.setState(prevPlaylist)
      console.log(prevPlaylist)
    }

    // console.log('Use addTrack')
    // if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    //   console.log('replace same song')
    //   return;
    // }
    // else { 
    //   // เพิ่ม Array เข้าไปที่  state playlistTracks
    //   this.state.playlistTracks.push(track)
    //   // console.log(this.state.playlistTracks.push(track))
    //   let arrNewTrack =
    //   console.log(this.state.playlistTracks)
    // }
  }

  // removeTrack
  removeTrack(track) {
    let prevPlaylist = this.state.playlistTracks
    const deleteSong = window.confirm(`Your remove song: ${track.name} - ${track.artist}`)
    if (deleteSong) {
      let newPlaylist = prevPlaylist.filter(prevPlaylist => prevPlaylist.id !== track.id)
      /*filter ตัวเพลงที่เราไม่ต้องการโดยเมื่อกดลบ มันจะเอา id ของเพลงใน track ที่กดลบมาเทียบกับ prevPlaylist อันไหนตรงจะถูกคัดออกแล้วจะได้ 
       object ของ newPlaylist ที่มีเพลงที่เหลือ */


      // ทำแบบนี้ไม่ได้เพราะเท่ากับว่าเรา setState prevPlaylist : newPlaylist แต่ตัวที่จะต้อง setState จริงๆคือ playlistTracks
      //  console.log({ prevPlaylist : newPlaylist })
      // this.setState( { prevPlaylist : newPlaylist } )
      // console.log(this.state)

      this.setState({ playlistTracks: newPlaylist })
      console.log({ playlistTracks: newPlaylist })
    }


  }

  // updatePlaylistName
  updatePlaylistName(name) {
    console.log(`updatePlaylistName : ${name}`)
    this.setState({ playlistName: name })
    console.log(`NewPlaylist : ${this.state.playlistName}`)

  }

  // savePlaylist
  savePlaylist() {

    const tackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlayList(this.state.playlistName, tackUris).then(
      {
        playlistName: 'New Playlist',
        playlistTracks: [],
      }
    )
    this.setState({
      searchResults: [],
      playlistName: 'NewPlaylist',
      playlistTracks: []
    })
    alert(`Save playlist : ${this.state.playlistName} Success!!`)
  }

  // Search
  search(term) {
    console.log(`Your search : ${term}`)
    Spotify.search(term).then(searchResultsSpotify => {
      this.setState({ searchResults: searchResultsSpotify })
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing <span className='kloof'>Kloof.san</span></h1>
        
        <div className="App">

          <SearchBar
            onSearch={this.search}
          />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            {/* 32. pass state this.state.searchResults = array ของobject searchResults ที่เก็บ array ของ object {name,artist,album,id} */}
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    )
  }
};


export default App;
