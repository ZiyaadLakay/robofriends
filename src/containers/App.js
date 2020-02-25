import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox.js';
import Scroll from '../components/Scroll'
import ErrorBoundry from '../components/ErrorBoundry';
import {setSearchField, requestRobots} from '../action'

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispacthToProps = (dispatch) => {
    return{
        onSearch: (event) => dispatch(setSearchField(event.target.value)),
        onRequestRobots : () => dispatch(requestRobots())
    }
    
}

class App extends Component{

    componentDidMount(){
       this.props.onRequestRobots();
        
    }

    render()
    {
        const {searchField, onSearch, robots, isPending} = this.props;
        const filterRobots = robots.filter(robots => {
            return robots.name.toLowerCase().includes(searchField.toLowerCase());
        })
        if(isPending){
            return <h1>Loading</h1>
        }
        else{
            return(
                    <div className='tc'>

                    <link href="https://fonts.googleapis.com/css?family=Share+Tech+Mono&display=swap" rel="stylesheet" /> 

                        <h1 className='f1'>RoboFriends</h1> {/*Title of Website */}
                        <SearchBox searchChange={onSearch}/> {/*Search Bar */}
                        <Scroll>
                            <ErrorBoundry>
                                <CardList robots={filterRobots} /> {/*card components */}
                            </ErrorBoundry>
                        </Scroll>
                    </div>
    );
        }
    }  
}

export default connect(mapStateToProps, mapDispacthToProps)(App);