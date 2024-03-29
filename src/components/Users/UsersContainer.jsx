import React from 'react';
import { connect } from 'react-redux';
import { follow,  unFollow, setCurrentPage,  toggleFollowingInProgress, getUsers } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../Common/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { getCurrentPageNumber,  getCurrentUsersWithReselector, getfollowingInProgress, getisFethcing, getPageSize, getTotalUsersCount } from '../../redux/usersSelectors';


//Классовая компонента - устарелка - не рекомендуется использовать
class UsersContainerComponent extends React.Component {
    

    constructor(props){
        super(props);                   //Если только эта операция - конструктор можно опустить

    }
    

    componentDidMount(){
        //Вызывается при создании компоненты
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
        //Перенесено в thunk
        /*this.props.toggleIsFetching(true);
        getUsers(this.props.currentPage, this.props.pageSize).then(data =>{
            this.props.toggleIsFetching(false);
            this.props.setUsers(data.items);
            this.props.setTotalUsersCount(data.totalCount);
        });*/   
    };
    

    onPageChanged = (pageNumber) =>{
        this.props.getUsers(pageNumber, this.props.pageSize);   
    }

    render()                                    //React будет вызывать этот метод при отрисовке, возвращать должен jsx
    {
        
        return <div>
        {this.props.isFethcing ? <Preloader />: null} 
        <Users totalUsersCount={this.props.totalUsersCount} 
            pageSize={this.props.pageSize}
            currentPage={this.props.currentPage}
            users={this.props.users}
            onPageChanged={this.onPageChanged}
            follow = {this.props.follow}
            unFollow = {this.props.unFollow}
            toggleFollowingInProgress={this.props.toggleFollowingInProgress}
            followingInProgress = {this.props.followingInProgress}
        />
        </div>

    }
}

//С использованием селекторов
let mapStateToProps= (state) =>
{
    return  {
        users: getCurrentUsersWithReselector(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPageNumber(state),
        isFethcing: getisFethcing(state),
        followingInProgress: getfollowingInProgress(state)
    }
}


/*
let mapStateToProps= (state) =>
{
    return  {
        users: state.users.users,
        pageSize: state.users.pageSize,
        totalUsersCount: state.users.totalUsersCount,
        currentPage: state.users.currentPage,
        isFethcing: state.users.isFethcing,
        followingInProgress: state.users.followingInProgress
    }
}*/

/*
let mapDispathcToProps = (dispatch) => 
{
    return{
        follow: (userId)=>{
            dispatch(followAC(userId));
        },
        unfollow: (userId)=> {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users)=> {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (pageNumber) => {
            dispatch(setCurrentPageAC(pageNumber))
        },
        setTotalUsersCount: (totalCount) =>{
            dispatch(setTotalUsersCountAC(totalCount))
        },
        toggleIsFetching: (isFethcing) =>{
            dispatch(toggleIsFetchingAC(isFethcing))
        }
}
};






const UsersContainer= connect(mapStateToProps,mapDispathcToProps)(UsersContainerComponent);



export default UsersContainer;
*/



//Сокращенная записить mapDispathToProps и HOC
export default withAuthRedirect(connect(
    mapStateToProps, 
    {follow, unFollow, setCurrentPage, 
        toggleFollowingInProgress, 
        getUsers})(UsersContainerComponent));

/*
export default connect(
    
    connect(mapStateToProps, {follow, unFollow, setCurrentPage, toggleFollowingInProgress, getUsers})
    
)(UsersContainerComponent);
*/