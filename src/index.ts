#!/usr/bin/env node
import os from 'os'
import cluster from 'cluster'
import startMediaServer from '@wepublish/krp-media-server'
import LocalStorageBackend from '@wepublish/krp-media-storage-local'
import SharpImageBackend from '@wepublish/krp-media-image-sharp'

if (cluster.isMaster) {
  const numClusters = process.env.NUM_CLUSTERS
      ? parseInt(process.env.NUM_CLUSTERS)
      : os.cpus().length

  for (let i = 0; i < numClusters; i++) {
    cluster.fork()
  }
} else {
  if (!process.env.TOKEN) {
    console.error('No TOKEN defined in the environment.')
    process.exit(1)
  }

  if (!process.env.STORAGE_PATH) {
    console.error('No STORAGE_PATH is defined in the environment.')
    process.exit(1)
  }

  const token = process.env.TOKEN!
  const storagePath = process.env.STORAGE_PATH!
  const maxUploadSize = process.env.MAX_UPLOAD_SIZE ? parseInt(process.env.MAX_UPLOAD_SIZE) : 2048 * 2048 * 10;

  const port = process.env.PORT ? parseInt(process.env.PORT) : 3004
  const address = process.env.ADDRESS ? process.env.ADDRESS : 'localhost'

  const debug = process.env.DEBUG === 'true'

  startMediaServer({
    storageBackend: new LocalStorageBackend(storagePath),
    imageBackend: new SharpImageBackend(),
    maxUploadSize,
    port,
    address,
    debug,
    logger: false,
    token
  })
}
