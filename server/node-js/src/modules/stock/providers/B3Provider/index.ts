import { container } from 'tsyringe'

import { BrapiB3Provider } from './implementations/BrapiB3Provider'
import { IB3Provider } from './models/IB3Provider'

container.registerSingleton<IB3Provider>('BrapiB3Provider', BrapiB3Provider)
