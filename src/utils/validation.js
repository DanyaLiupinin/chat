const usernameValidation = (data, userlist) => {
        for (let i = 0; i < userlist.length; ++i) {
            if (userlist[i].username === data) {
                return true
            }
        }
    }

const inputValidation = (value) => {
        if (value.trim() === '') {
            return false
        } else {
            return true
        }
    }

const validation = {
    usernameValidation,
    inputValidation
}

export default validation