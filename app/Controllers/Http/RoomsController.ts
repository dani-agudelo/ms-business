import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Room from 'App/Models/Room';
import RoomValidator from 'App/Validators/RoomValidator';

export default class RoomsController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theRoom: Room = await Room.findOrFail(params.id);
            return theRoom;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Room.query().paginate(page, perPage)
            } else {
                return await Room.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(RoomValidator);
        const theRoom: Room = await Room.create(body);
        return theRoom;
    }

    public async update({ params, request }: HttpContextContract) {
        const theRoom: Room = await Room.findOrFail(params.id);
        const data = request.body();
        theRoom.merge(data);
        return await theRoom.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theRoom: Room = await Room.findOrFail(params.id);
        response.status(204);
        return await theRoom.delete();
    }

}