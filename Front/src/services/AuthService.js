import ls from 'local-storage'

const AuthService = {
    isAuthenticated: ls.get("isAuthenticated") || false,
    username: ls.get("username") || "",
    passHash: ls.get("passHash") || "",
    role: ls.get("role") || "dr_oak_role",

    authenticate(cb) {
        this.isAuthenticated = true
        this.role = "dr_oak_role"
        ls.set('isAuthenticated', true)
        ls.set('role', "dr_oak_role")
        console.log(this)
      setTimeout(cb, 500) // fake async
    },

    signout(cb) {
        this.isAuthenticated = false
        this.role = null
        ls.set('isAuthenticated', false)
        ls.set('role', null)
      setTimeout(cb, 500) // fake async
    }
}

export default AuthService