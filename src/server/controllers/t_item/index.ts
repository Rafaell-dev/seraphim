import * as create from './create';
import * as getAll from './getAll';
import * as getById from './getById';
import * as deleteById from './deleteById';
import * as updateById from './updateById';

export const t_itemController = {
  ...create,
  ...getAll,
  ...getById,
  ...updateById,
  ...deleteById,
};
