import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import config from "../config"
import { UserType } from "../resources/user/user.interface"
export const checkPassword = (password: string, passwordHash: string) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err)
            {
                reject(err)
            }
            
                resolve(same)
        })
    })
}

export const newToken = (user : UserType) => {
    return jwt.sign({ id: user._id }, config.secrets.jwt, {
      expiresIn: config.secrets.jwtExp
    })
  }
  
export const verifyToken = (token:string) =>
    new Promise((resolve, reject) => {
      jwt.verify(token, config.secrets.jwt, (err, payload) => {
        if (err) return reject(err)
        resolve(payload)
      })
    })


