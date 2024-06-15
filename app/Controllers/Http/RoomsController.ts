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

    async getRoomsByHeadquarter({ params }: HttpContextContract) {
        return Room.query()
            .where("headquarter_id", params.headquarter_id)
            .preload("headquarter")
            .then((rooms: Room[]) => {
                return rooms.map((r) => {
                    return {
                        id: r.id,
                        headquarter_id: r.headquarter_id,
                        room_name: r.room_name,
                        room_capacity: r.room_capacity,
                        facilities: r.facilities,
                        is_available: r.is_available,
                    };
                });
            });
    }

    async getSepulturesByRoom({ params }: HttpContextContract) {
        const theRoom: Room = await Room.findOrFail(params.id);
        await theRoom.load('sepultures');

        return Promise.all(
            theRoom.sepultures.map(async (sep) => {
                return {
                    id: sep.id,
                    room_id: sep.room_id,
                    sepulture_name: sep.sepulture_name,
                    description: sep.description,
                    cemetery_name: sep.cemetery_name,
                    sepulture_type: sep.sepulture_type,
                    price: sep.price,
                    is_available: sep.is_available,
                };
            }),
        );
    }
}