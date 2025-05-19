const getDbURL = (): string => {
    let url = "postgres://"
    const { DB_HOST, DB_PORT, DB_DATABASE, DB_USER, DB_PASSWORD } = process.env || {}
    if (!DB_HOST || !DB_PORT || !DB_DATABASE || !DB_USER) {
      throw new Error("invalid DB connection configuration")
    }
    if (process.env.DB_PASSWORD) {
      url = `${url}${process.env.DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`
    } else {
      url = `${url}${process.env.DB_USER}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`
    }
    return url
  }
  
  console.log("getDbURL =======================>", getDbURL)
  export default getDbURL
  