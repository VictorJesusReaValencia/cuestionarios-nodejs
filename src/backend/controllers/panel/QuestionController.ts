// src/backend/controllers/panel/QuestionController.ts
import { Request, Response } from 'express';
import Question from '../../models/Question';
import AnswerOption from '../../models/AnswerOption';
import User from '../../models/User';

export const createQuestion = async (req: Request, res: Response) => {
    const { question, options } = req.body;

    if (!question || !options || !Array.isArray(options)) {
        return res.status(400).render('error', { message: 'Faltan datos en la solicitud' });
    }

    try {
        const newQuestion = await Question.create({
            question,
            // @ts-ignore
            creatorUserId: req.user.userId, // Asumiendo que el middleware añade req.user
        });

        for (const option of options) {
            await AnswerOption.create({
                option: option.option,
                correct: option.correct,
                questionId: newQuestion.id,
            });
        }

        res.status(201).render('success', { message: 'Pregunta creada con éxito' });
    } catch (error) {
        console.error('Error al crear la pregunta:', error);
        res.status(500).render('error', { message: 'Error interno del servidor' });
    }
};

export const getQuestions = async (req: Request, res: Response) => {
    try {
        const latestQuestion = await Question.findOne({
            include: [AnswerOption, User],
            order: [['createdAt', 'DESC']],
        });

        res.render('questions', { latestQuestion });
    } catch (error) {
        console.error('Error al obtener preguntas:', error);
        res.status(500).render('error', { message: 'Error interno del servidor' });
    }
};

export const deleteQuestion = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const question = await Question.findByPk(id);

        if (!question) {
            return res.status(404).render('error', { message: 'Pregunta no encontrada' });
        }

        await question.destroy();
        res.render('success', { message: 'Pregunta eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la pregunta:', error);
        res.status(500).render('error', { message: 'Error interno del servidor' });
    }
};
