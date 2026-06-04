import { container } from 'tsyringe'

import { DateFnsDateProvider } from './DateProvider/implementations/DateFnsDateProvider'
import { IDateProvider } from './DateProvider/models/IDateProvider'
// import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
// import { IMalProvider } from './MailProvider/models/IMalProvider'
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider'
import { IStorageProvider } from './StorageProvider/models/IStorageProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IDateProvider>('DateProvider', DateFnsDateProvider)

// container.registerInstance<IMalProvider>(
//   'MailProvider',
//   new EtherealMailProvider(),
// )
