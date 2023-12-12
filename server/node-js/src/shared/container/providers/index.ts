import { container } from 'tsyringe'

import { DayjsDateProvider } from './DateProvider/implementations/DayjsDateProvider'
import { IDateProvider } from './DateProvider/models/IDateProvider'
import { DiskStorageProvider } from './StorageProvider/implementations/DiskStorageProvider'
import { IStorageProvider } from './StorageProvider/models/IStorageProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { IMalProvider } from './MailProvider/models/IMalProvider'

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
)

container.registerSingleton<IDateProvider>('DateProvider', DayjsDateProvider)

container.registerInstance<IMalProvider>(
  'MailProvider',
  new EtherealMailProvider(),
)
