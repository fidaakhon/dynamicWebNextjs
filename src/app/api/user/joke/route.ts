import { connectToDB } from "@/db/dbConfig";
import { Joke } from "@/models/jokes";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next/types";


connectToDB()
    .then(() => console.log("Connected to database"))
    .catch((err) => console.log(err))

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id, title, content } = reqBody;
        const newJoke = new Joke({
            id,
            title,
            content
        })
        await newJoke.save();
    } catch (error) {
        return NextResponse.json({ message: "Error saving joke!" })
    }
}

export async function GET(req: any, res: any) {
    console.log("this is the request", req.query);
    try {
        // const id = req.query.id as string;
        // const jokeId = parseInt(id, 10);

        // if (isNaN(jokeId)) {
        //     throw new Error('Invalid ID');
        // }



        //Querying the database
        // const query = await Joke.findOneAndUpdate({ id: 2 }, { title: "updated Title" }, { new: true });
        const query = await Joke.findOne({ id: 10 });
        // const query = await Joke.find();
        // const query = await Joke.findOneAndReplace({ id: 4 }, { title: "updated Title" });
        // const query = await Joke.findOneAndDelete({ id: 4 });



        console.log(query);
        return NextResponse.json(query);
    } catch (error) {
        // console.error(error);
        return NextResponse.json({
            message: "Not getting the data",
            status: 500
        });
    }
}



export async function PUT(req: NextRequest, res: NextResponse) {
    try {
        const reqBody = await req.json();
        const { id, title, content } = reqBody;
        const jokeId = parseInt(id, 10);
        if (isNaN(jokeId)) {
            throw new Error('Invalid ID');
        }
        const joke = await Joke.findOneAndUpdate({ id: jokeId }, { title, content }, { new: true });
        return NextResponse.json(joke);
    } catch (error) {
        return NextResponse.json({ message: "Error updating joke!" })
    }
}


export async function DELETE(req: NextApiRequest) {
    console.log("this is the request", req.query);
    try {
        const id = req.query.id as string;
        const jokeId = parseInt(id, 10);
        console.log(jokeId);
        const joke = await Joke.findOneAndDelete({ id: jokeId });
        return NextResponse.json(joke);
    } catch (error) {
        return NextResponse.json({ message: "Error deleting joke!" })
    }
}

