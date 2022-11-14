import React from "react";
import Track from "../Track/Track";
import './TrackList.css'

class TrackList extends React.Component {
    render() {
        return (
            /* this.props.tracks เราส่งมาจาก SearchResults โดยเอาตัว component TrackList ไปรับ
            / ตอนนี้เราต้องการเอา track เพลงมาโชว์เราทำโดยการ 
            this.props.tracks.map(track => { track =[
        { name: 'Move on',artist: 'FlookSan',album: 'Dev lv.1',id: 9 },
        { name: 'Move around',artist: 'FlookSan',album: 'Dev lv.1.2',id: 10 },
        { name: 'Move new GF',artist: 'FlookSan',album: 'Dev lv.2',id: 19 },]
                        
                        return <Track track={track} 
                        key={track.id} />
                    }) */
            <div className="TrackList">
                {
                    
                    this.props.tracks.map((track) => {
                        
                        return <Track track={track} 
                        key={track.id} 
                        onAdd={this.props.onAdd} 
                        onRemove={this.props.onRemove} 
                        isRemoval={this.props.isRemoval} />
                    })
                    
                }
            </div>
        )
    }

}

export default TrackList;



// {data.map(item => {
//     return (
//         <h1>{item.name}</h1>
//     )
//  }
//   )
//    }


//    {
                    
//     this.props.tracks.map((track) => {
        
//         return <Track track={track} 
//         key={track.id} 
//         onAdd={this.props.onAdd} 
//         onRemove={this.props.onRemove} 
//         isRemoval={this.props.isRemoval} />
//     })
    
// }