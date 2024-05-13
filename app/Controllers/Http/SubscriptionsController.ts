import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Subscription from "App/Models/Subscription";
import SubscriptionValidator from 'App/Validators/SubscriptionValidator';

export default class SubscriptionsController {
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
          let theSubscription: Subscription =
            await Subscription.findOrFail(params.id);
          return theSubscription;
        } else {
          const data = request.all();
          if ("page" in data && "per_page" in data) {
            const page = request.input("page", 1);
            const perPage = request.input("per_page", 20);
            return await Subscription.query().paginate(page, perPage);
          } else {
            return await Subscription.query();
          }
        }
      }
      public async create({ request }: HttpContextContract) {
        const body = await request.validate(SubscriptionValidator);
        const theSubscription: Subscription =
          await Subscription.create(body);
        return theSubscription;
      }
    
      public async update({ params, request }: HttpContextContract) {
        const theSubscription: Subscription =
          await Subscription.findOrFail(params.id);
        const data = await request.validate(SubscriptionValidator);
        theSubscription.merge(data);
        return await theSubscription.save();
      }
    
      public async delete({ params, response }: HttpContextContract) {
        const theSubscription: Subscription =
          await Subscription.findOrFail(params.id);
        response.status(204);
        return await theSubscription.delete();
      }
}
