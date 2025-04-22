# Configuración de Supabase para el Contrato TechNova AI

Para configurar la base de datos en Supabase, sigue estos pasos:

## 1. Crear una cuenta en Supabase

1. Ve a [supabase.com](https://supabase.com) y crea una cuenta
2. Crea un nuevo proyecto

## 2. Configurar las tablas en SQL Editor

Ejecuta el siguiente SQL para crear las tablas necesarias:

\`\`\`sql
-- Tabla de contratos
CREATE TABLE contracts (
  id SERIAL PRIMARY KEY,
  contract_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de socios
CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  signed BOOLEAN DEFAULT FALSE,
  signature_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de firmas
CREATE TABLE signatures (
  id SERIAL PRIMARY KEY,
  partner_id INTEGER REFERENCES partners(id),
  partner_name TEXT NOT NULL,
  signature_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear políticas de seguridad (RLS)
ALTER TABLE contracts ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE signatures ENABLE ROW LEVEL SECURITY;

-- Crear políticas para permitir acceso anónimo (solo para demostración)
CREATE POLICY "Allow anonymous read access to contracts" ON contracts FOR SELECT USING (true);
CREATE POLICY "Allow anonymous write access to contracts" ON contracts FOR INSERT USING (true);

CREATE POLICY "Allow anonymous read access to partners" ON partners FOR SELECT USING (true);
CREATE POLICY "Allow anonymous write access to partners" ON partners FOR INSERT USING (true);
CREATE POLICY "Allow anonymous update access to partners" ON partners FOR UPDATE USING (true);

CREATE POLICY "Allow anonymous read access to signatures" ON signatures FOR SELECT USING (true);
CREATE POLICY "Allow anonymous write access to signatures" ON signatures FOR INSERT USING (true);
\`\`\`

## 3. Obtener las credenciales de API

1. Ve a la sección "Settings" > "API" en tu proyecto de Supabase
2. Copia la URL y la "anon key"
3. Actualiza el archivo `lib/supabase.ts` con estas credenciales

## 4. Configurar variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

\`\`\`
NEXT_PUBLIC_SUPABASE_URL=tu-url-de-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anon-de-supabase
\`\`\`

## 5. Reiniciar la aplicación

Reinicia la aplicación para que los cambios surtan efecto.
