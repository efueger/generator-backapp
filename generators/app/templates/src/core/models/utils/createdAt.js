export default function addCreatedAt (next) {
  if (this._createdAt) next()
  if (this.isNew) {
    this._createdAt = new Date()
  }

  next()

}
