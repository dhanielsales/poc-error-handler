export interface UserSchema {
  id: string
  name: string
}

export interface UserUpdateModel {
  params: {
    id: string
  }
  body: {
    name: string
  }
}


