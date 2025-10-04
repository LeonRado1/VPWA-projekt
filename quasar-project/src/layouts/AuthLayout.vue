<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="flex flex-center q-my-xl">
        <q-card class="q-pa-md shadow-2 rounded-xl">
          <q-tabs>
            <q-route-tab to="/auth/login" label="Login" exact />
            <q-route-tab to="/auth/signup" label="Signup" exact />
          </q-tabs>
          <q-separator />
          <router-view />
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script lang="ts"></script>
