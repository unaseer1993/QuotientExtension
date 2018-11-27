/*global chrome*/
/*global safari*/
import React from 'react';
import RecentlyVistedRow from './recentlyVisitedRow';


class RecentlyVistedItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: []
        }

    }
    componentDidMount() {
        let stack = [];
        stack.push(0);
        stack.push(0);
        stack.push(0);
        stack.push(0);

if( localStorage.getItem('stack')!== null)
{
var result =  localStorage.getItem('stack');

            stack = result;
            stack = JSON.parse(stack);
            let n = stack.length;
 
            if (n % 2 !== 0) {
                let rem = n % 2;
                n = n - rem;
            }
            for (var i = 0; i < n; i += 2) {
                 this.state.items.push(<RecentlyVistedRow id1={stack.pop()} id2={stack.pop()} />);

            }
      //  });

}

    }


    render() {
        // console.log(this.state.items);
        return ([
            <div>
                {this.state.items.length > 0 &&

                    <div>
                        <h2 className="recent-store-heading before-after">
                            <span>Recent Store</span>
                        </h2>
                    </div>}

                <div>
                    {this.state.items}
                </div>

            </div>
        ]);
    }
    getNumber(stack) {
        var index = 0;

        for (var i = 0; i < stack.length; i++) {
            // if (stack[i] !== null) {
                index++;
            // }
        }
        //console.log(index);
        return index;

    }

}


export default RecentlyVistedItem;
