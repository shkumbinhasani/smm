import {
    Paper,
    TextInput,
    PasswordInput,
    Button,
    Title,
    Text,
    Anchor,
} from '@mantine/core';
import useStyles from "./LoginPage.styles";
import {useForm} from "@mantine/form";
import {signInWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../configs/firebase";
import {useState} from "react";

const LoginPage = () => {
    const {classes} = useStyles();
    const [loading, setLoading] = useState<boolean>(false);
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
    });

    const handleSubmit = (data: { email: string, password: string }) => {
        setLoading(true);
        signInWithEmailAndPassword(auth, data.email, data.password).catch((error) => {
            console.log(error)
        }).finally(() => {
            setLoading(false);
        })
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={classes.form} radius={0} p={30}>
                <form
                    onSubmit={form.onSubmit(handleSubmit)}
                >
                    <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
                        Welcome back to SSM!
                    </Title>

                    <TextInput label="Email address" placeholder="hello@gmail.com" size="md"
                               name={"email"} {...form.getInputProps('email')} />
                    <PasswordInput label="Password" placeholder="Your password" mt="md" size="md"
                                   name={"password"} {...form.getInputProps('password')} />
                    <Button fullWidth mt="xl" size="md" type={"submit"} loading={loading}>
                        Login
                    </Button>

                    <Text align="center" mt="md">
                        Don&apos;t have an account?{' '}
                        <Anchor<'a'> href="#" weight={700} onClick={(event) => event.preventDefault()}>
                            Register
                        </Anchor>
                    </Text>
                </form>
            </Paper>
        </div>
    );
}

export default LoginPage;
