const { v4: uuidv4 } = require('uuid')
const fs = require('fs')
const path = require('path')

const filePath = path.resolve(__dirname, "../database/shows.json")
const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

data.forEach((show) => {
    const newUuid = uuidv4()
    show.id = newUuid
  }
)

fs.writeFileSync('shows.json', JSON.stringify(data, null, 2))
