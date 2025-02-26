import { container } from 'tsyringe'

import { BrapiB3Provider } from './B3Provider/implementations/BrapiB3Provider'
import { IB3Provider } from './B3Provider/models/IB3Provider'

container.registerSingleton<IB3Provider>('BrapiB3Provider', BrapiB3Provider)
