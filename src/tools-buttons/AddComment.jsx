import { useContext, useState } from 'react'
import { Fab, TextField, Box } from '@mui/material/'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { postCommentToArticle } from '../../api/api'
import { UsernameContext } from '../../contexts/UsernameContext'
import { CommentSeedContext } from '../../contexts/CommentSeedContext'


const AddComment = ({ id }) => {
  const { commentSeed, setCommentSeed } = useContext(CommentSeedContext)
  const { username } = useContext(UsernameContext)
  const [userComment, setUserComment] = useState('')
  const [commentColor, setCommentColor] = useState('default')

  const submitCommentHandler = () => {
    if (userComment.length < 1 || userComment === ' ') {
      setCommentColor('error')
    }
    else {
      setCommentSeed(!commentSeed)
      setCommentColor('secondary')
      postCommentToArticle(userComment, username, id).then(() => {
        setCommentColor('default')
      })
      setUserComment('')
    }
  }

  const inputHandler = (event) => {
    setUserComment(event.target.value)
    setCommentColor('default')
  }

  return (
    <Box className="comment-input-container">
      <TextField
        className="comment-input"
        variant="outlined"
        label="Comment"
        value={userComment}
        onChange={inputHandler}
      ></TextField>
      <Box className='comment-button-container'>
        <Fab onClick={submitCommentHandler} color={commentColor}>
          <AddCommentIcon />
        </Fab>
      </Box>
      {commentColor === 'error' && <p style={{ color: 'red' }}>please enter a comment to submit</p>}
    </Box>
  )
}

export default AddComment