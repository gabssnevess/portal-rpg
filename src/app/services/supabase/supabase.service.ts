import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hncnttqqpabpxtkmiryj.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhuY250dHFxcGFicHh0a21pcnlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc4NDk5NzAsImV4cCI6MjA2MzQyNTk3MH0._7KPWVjvUAIlC8x0cdyJ_8vxKVgxMvW44vRRni_FMiU';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  // Login
  async SignIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({email, password});
  }

  // Logout
  async SignOut() {
    return this.supabase.auth.signOut();
  }

  // Get user data
  async GetUser() {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }

  // Changing states
  OnAuthStateChange(callback: Function) {
    this.supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session);
    });
  }

  // Get sistemas
  async GetSistemas() {
    return this.supabase.from('sistemas').select('*');
  }
}