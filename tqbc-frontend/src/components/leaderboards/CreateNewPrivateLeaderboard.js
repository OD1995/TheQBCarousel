import { useRef } from "react";
import Form from "react-validation/build/form";

export const CreateNewPrivateLeaderboard = () => {

    const form = useRef();

    const handleSubmit = () => {

    }

    return (
        <div>
            <Form
                onSubmit={handleSubmit}
                ref={form}
            >

            </Form>
        </div>
    );
}