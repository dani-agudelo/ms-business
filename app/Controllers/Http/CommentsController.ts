import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment';
import CommentValidator from 'App/Validators/CommentValidator';

export default class CommentsController {
    
    public async find({ request, params }: HttpContextContract) {
        if (params.id) {
            let theComment: Comment = await Comment.findOrFail(params.id);
            return theComment;
        } else {
            const data = request.all()
            if ("page" in data && "per_page" in data) {
                const page = request.input('page', 1);
                const perPage = request.input("per_page", 20);
                return await Comment.query().paginate(page, perPage)
            } else {
                return await Comment.query()
            }

        }

    }
    public async create({ request }: HttpContextContract) {
        const body = await request.validate(CommentValidator);
        const theComment: Comment = await Comment.create(body);
        return theComment;
    }

    public async update({ params, request }: HttpContextContract) {
        const theComment: Comment = await Comment.findOrFail(params.id);
        const data = request.body();
        theComment.merge(data);
        return await theComment.save();
    }

    public async delete({ params, response }: HttpContextContract) {
        const theComment: Comment = await Comment.findOrFail(params.id);
        response.status(204);
        return await theComment.delete();
    }

}