import * as dotenv from 'dotenv'
dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? '.env.production'
      : '.env.development'
})

import { app } from '@/main/config/app'

const PORT = 4000

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
