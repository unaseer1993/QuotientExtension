import React from 'react';


class RecentlyVistedBox extends React.Component {
        render(){
            id=this.props.id;
            return ([
                <div className="recent-store">
                    <img src={"https://quotientmedia.blob.core.windows.net/mediacontainer/"+id1+"_large.png"} alt={id1} onError={(e) => { e.target.src = "index.png" }}/>
                    <div className="up-to">
                        UP TO
                    </div>
                    <div className="recent-store-cash-back">
                        2% Cash Back
                    </div>
                </div>
            ]);
        }

}

export default  RecentlyVistedBox;