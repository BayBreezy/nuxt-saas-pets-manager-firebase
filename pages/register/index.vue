<template>
  <UiContainer class="flex min-h-dvh items-center justify-center">
    <div class="w-full max-w-[340px]">
      <div class="text-center">
        <h1 class="text-3xl font-semibold lg:text-4xl">Create account</h1>
        <p class="mt-2 text-lg text-muted-foreground">Start managing your pets today!</p>
      </div>
      <form @submit="submit" class="mt-10">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput name="name" label="Full name *" placeholder="John Doe" />
          <UiVeeInput name="email" label="Email *" placeholder="john@example.com" type="email" />
          <UiVeeInput name="password" label="Password *" type="password" />
          <UiButton type="submit" class="w-full"> Create account </UiButton>
          <UiDivider label="or" />
          <UiButton @click="signUpWithGoogle" type="button" class="w-full" variant="outline">
            <Icon name="logos:google-icon" /> Sign up with Google
          </UiButton>
        </fieldset>
      </form>
      <p class="mt-10 text-center text-sm">
        Already have an account?
        <NuxtLink class="text-sm font-semibold text-primary hover:underline" to="/"
          >Sign in here</NuxtLink
        >
      </p>
    </div>
  </UiContainer>
</template>

<!-- This has to be created in a separate script tag -->
<script lang="ts">
  import { GoogleAuthProvider } from "firebase/auth";

  export const googleAuthProvider = new GoogleAuthProvider();
</script>

<script lang="ts" setup>
  import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";

  definePageMeta({ middleware: "already-logged-in" });
  useSeoMeta({
    title: "Create account",
    description: "Create an account to manage your pets",
  });

  // get auth instance
  const auth = useFirebaseAuth();

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(RegisterSchema),
  });

  const submit = handleSubmit(async (values, ctx) => {
    const loading = useSonner.loading("Loading...", {
      description: "Creating your account",
    });
    try {
      const { user } = await createUserWithEmailAndPassword(auth!, values.email, values.password);
      await updateProfile(user, { displayName: values.name });
      useSonner.success("Account created successfully!", {
        id: loading,
      });
      // redirect to the dashboard
      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      // show error
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  });

  const signUpWithGoogle = async () => {
    const loading = useSonner.loading("Loading...", {
      description: "Creating your account",
    });
    try {
      await signInWithPopup(auth!, googleAuthProvider);
      useSonner.success("Account created successfully!", {
        id: loading,
      });
      // redirect to the dashboard
      return await navigateTo("/admin/dashboard", { replace: true });
    } catch (error: any) {
      // show error
      console.log(error.message);
      useSonner.error(error.message, {
        id: loading,
      });
    }
  };
</script>
