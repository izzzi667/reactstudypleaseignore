const ADD_POST ='ADD-POST'; //Acrtion type - для уменьшения ошибк в написании Action Creator, просто не даст скомпилироваться при ошибке
const UPDATE_NEW_POST_TEXT ='UPDATE-NEW-POST-TEXT';

let initialState={
    postsData: [
        {id:0, header:'Привет', text:'Текст поста 1-2-3', likeCounts:5},
        {id:1, header:'Привет 2', text:'Текст поста 1-2-3-4', likeCounts:3},
        {id:2, header:'Привет 3', text:'ААА Текст поста 1-2-3-4', likeCounts:3}
    ]
    ,newPostText: ''
};



const profileReducer = (state = initialState, action) =>{
    switch (action.type) {
        case ADD_POST: {           
                //Необходимо - react redux проверяет при перисовке, что меняется ссылка на объект, а не конекст
            return {...state, 
                    postsData: [...state.postsData,{id: 5, header: 'NewPost', text: state.newPostText, likeCounts:0 }],
                    newPostText: ''
                };

            }
        case UPDATE_NEW_POST_TEXT:
            return {...state, newPostText: action.postMessage}
        default:
            break;
    }
    return state;
}

export const addPostActionCreator = () => ({type: ADD_POST});
export const onPostChangeActionCreator = (text) => ({type: UPDATE_NEW_POST_TEXT,postMessage: text });

export default profileReducer;