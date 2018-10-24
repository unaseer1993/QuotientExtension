import React from 'react';
import RecentlyVistedBox from './recentlyVisitedBox'


class RecentlyVistedRow extends React.Component {

    


    render(){

        /* console.log("id1 ");
        console.log(this.props.store1);
        console.log("id2");
       
        console.log(this.props.store2); */
        
        const id1=this.props.id1.id;
        const id2=this.props.id2.id;
        const link1=this.props.id1.link;
        const link2= this.props.id2.link
        
        return ([

        <div className="recent-store-row">
               
            <RecentlyVistedBox id={id1} link={link1}/>
            <RecentlyVistedBox id={id2} link={link2}/>
        </div>
    
    ]);
    }
}

export default RecentlyVistedRow;