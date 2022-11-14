import React from "react";
import "./Track.css"

class Track extends React.Component {
    constructor(props) {
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }

    renderAction () {
        if (this.props.isRemoval) {
            return <button className="Track-action" onClick={this.removeTrack} >-</button>
        }
        else {
            return <button className="Track-action"  onClick={this.addTrack} >+</button>
        } 
    }

    addTrack() {
        // 45.Pass this.props.track to this.props.onAdd.
        this.props.onAdd(this.props.track)
    }

    removeTrack() {
        this.props.onRemove(this.props.track)
    }


    render() {
        return (
            /* หากดูใน Component Reactdev.tool จะพบว่ามันส่ง props มาชื่อ track ตามที่เราส่งมาจาก TrackList.js (ใน TrackList เราเรียก
                Track component มารับ this.props.tracks แต่ๆ เราใช้ .map(track) เพื่อต้องการให้มันโชว์ในกระดานของSearchResult)
                ดังนั้นสิ่งที่ส่งมาคือ props = track แต่ละอันนั่นเอง (this.props.track) 
                ในหน้านี้จะเอา ตัว name , artist , album มาแตกย่อยโดยการ เรียก this.props.name เป็นเรียกใช้ value = name ของ object = props ที่อยู่ใน this = Track(clss component)
            
            */
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist}  | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        )
    }
}

export default Track;






