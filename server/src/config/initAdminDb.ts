import pool from './db';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const initAdminDb = async () => {
    try {
        console.log('Initializing Admin Database Tables...');


        // 1. Services Management
        // Add columns for password reset to admins table
        await pool.query(`
            ALTER TABLE admins ADD COLUMN IF NOT EXISTS reset_password_token VARCHAR(255);
            ALTER TABLE admins ADD COLUMN IF NOT EXISTS reset_password_expires BIGINT;
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS services (
                id SERIAL PRIMARY KEY,
                slug VARCHAR(100) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                category_id VARCHAR(50) NOT NULL,
                short_overview TEXT,
                long_overview TEXT,
                doodle_type VARCHAR(50),
                state VARCHAR(100),
                is_visible BOOLEAN DEFAULT TRUE,
                sort_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Safe schema updates for services
            ALTER TABLE services ADD COLUMN IF NOT EXISTS short_overview TEXT;
            ALTER TABLE services ADD COLUMN IF NOT EXISTS long_overview TEXT;
            ALTER TABLE services ADD COLUMN IF NOT EXISTS state VARCHAR(100);
            ALTER TABLE services ADD COLUMN IF NOT EXISTS category_id VARCHAR(50);
            
            -- Rename old columns if they exist and data needs to be preserved
            -- (Doing this safely: check if old exists AND new doesn't)
            DO $$ 
            BEGIN 
                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='category') THEN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='category_id') THEN
                        ALTER TABLE services RENAME COLUMN category TO category_id;
                    END IF;
                END IF;
                IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='overview') THEN
                    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='services' AND column_name='short_overview') THEN
                        ALTER TABLE services RENAME COLUMN overview TO short_overview;
                    END IF;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS service_problems (
                id SERIAL PRIMARY KEY,
                service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
                problem_text TEXT NOT NULL,
                sort_order INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS service_features (
                id SERIAL PRIMARY KEY,
                service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                hint TEXT,
                sort_order INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS service_benefits (
                id SERIAL PRIMARY KEY,
                service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
                keyword VARCHAR(100) NOT NULL,
                text TEXT NOT NULL,
                sort_order INTEGER DEFAULT 0
            );

            CREATE TABLE IF NOT EXISTS service_why_truscomp (
                id SERIAL PRIMARY KEY,
                service_id INTEGER REFERENCES services(id) ON DELETE CASCADE,
                point_text TEXT NOT NULL,
                sort_order INTEGER DEFAULT 0
            );

            -- Safe schema updates for services
            ALTER TABLE services ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;
            ALTER TABLE services ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;
        `);

        // 2. Resources & Compliance
        await pool.query(`
            CREATE TABLE IF NOT EXISTS resources (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                release_date VARCHAR(50),
                effective_date VARCHAR(50),
                state VARCHAR(100),
                category VARCHAR(100) NOT NULL,
                download_url TEXT,
                speaker_name VARCHAR(255),
                speaker_role VARCHAR(255),
                speaker_org VARCHAR(255),
                speaker_image TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS compliance_updates (
                id SERIAL PRIMARY KEY,
                slug VARCHAR(255) UNIQUE NOT NULL,
                title VARCHAR(255) NOT NULL,
                summary TEXT,
                category VARCHAR(50),
                date_text VARCHAR(50),
                impact VARCHAR(50),
                action_required VARCHAR(50),
                overview_content TEXT,
                what_changed_content TEXT,
                who_it_impacts_content TEXT,
                what_you_should_do_content TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS holidays (
                id SERIAL PRIMARY KEY,
                state_code VARCHAR(10) NOT NULL,
                holiday_date DATE NOT NULL,
                day_name VARCHAR(20),
                holiday_name VARCHAR(255) NOT NULL,
                holiday_type VARCHAR(50) DEFAULT 'Gazetted'
            );

            -- Safe schema updates for resources
            ALTER TABLE resources ADD COLUMN IF NOT EXISTS public_id VARCHAR(255);
            ALTER TABLE resources ADD COLUMN IF NOT EXISTS speaker_name VARCHAR(255);
            ALTER TABLE resources ADD COLUMN IF NOT EXISTS speaker_role VARCHAR(255);
            ALTER TABLE resources ADD COLUMN IF NOT EXISTS speaker_org VARCHAR(255);
            ALTER TABLE resources ADD COLUMN IF NOT EXISTS speaker_image TEXT;
            ALTER TABLE resources ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;

        `);

        // 3. Blogs & Testimonials
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blogs (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                slug VARCHAR(255) UNIQUE NOT NULL,
                category VARCHAR(100),
                author VARCHAR(255),
                tags JSONB,
                published_date DATE,
                date_text VARCHAR(50),
                read_time VARCHAR(20),
                short_description TEXT,
                long_description TEXT,
                final_thoughts TEXT,
                banner_image TEXT,
                attachments JSONB,
                is_visible BOOLEAN DEFAULT TRUE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Safe schema updates for existing tables
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS author VARCHAR(255);
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS tags JSONB;
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS published_date DATE;
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS date_text VARCHAR(50);
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS read_time VARCHAR(20);
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS short_description TEXT;
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS long_description TEXT;
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS final_thoughts TEXT;
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS banner_image TEXT;
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS attachments JSONB;
            ALTER TABLE blogs ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;


            CREATE TABLE IF NOT EXISTS testimonials (
                id SERIAL PRIMARY KEY,
                quote TEXT NOT NULL,
                client_name VARCHAR(255) NOT NULL,
                designation VARCHAR(255),
                company VARCHAR(255),
                engagement_type VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            CREATE TABLE IF NOT EXISTS why_choose_us (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                icon_name VARCHAR(50)
            );

            -- Safe schema updates for testimonials
            ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 5;
            ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS image_url TEXT;
            ALTER TABLE testimonials ADD COLUMN IF NOT EXISTS is_visible BOOLEAN DEFAULT TRUE;
        `);

        // 4. Leads & Settings
        await pool.query(`
            CREATE TABLE IF NOT EXISTS enquiries (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                company VARCHAR(255),
                phone VARCHAR(20),
                industry VARCHAR(100),
                employees VARCHAR(50),
                service_interest VARCHAR(100),
                message TEXT,
                status VARCHAR(20) DEFAULT 'new',
                notes TEXT,
                confirmed_at TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Ensure columns exist if table was already created
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='enquiries' AND column_name='notes') THEN
                    ALTER TABLE enquiries ADD COLUMN notes TEXT;
                END IF;
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='enquiries' AND column_name='confirmed_at') THEN
                    ALTER TABLE enquiries ADD COLUMN confirmed_at TIMESTAMP;
                END IF;
            END $$;

            CREATE TABLE IF NOT EXISTS settings (
                key VARCHAR(100) PRIMARY KEY,
                value JSONB NOT NULL
            );

            -- 5. SEO Metadata
            CREATE TABLE IF NOT EXISTS seo_meta (
                id SERIAL PRIMARY KEY,
                page_type VARCHAR(50) NOT NULL,
                page_reference_id VARCHAR(100),
                meta_title VARCHAR(255),
                meta_description TEXT,
                meta_keywords TEXT,
                canonical_url TEXT,
                og_title VARCHAR(255),
                og_description TEXT,
                og_image TEXT,
                twitter_title VARCHAR(255),
                twitter_description TEXT,
                robots VARCHAR(100) DEFAULT 'index, follow',
                schema_type VARCHAR(100) DEFAULT 'Organization',
                status VARCHAR(20) DEFAULT 'published',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            DROP INDEX IF EXISTS idx_seo_page_unique;
            CREATE UNIQUE INDEX idx_seo_page_unique ON seo_meta (page_type, COALESCE(page_reference_id, ''));

            -- 6. Labour Law Updates
            CREATE TABLE IF NOT EXISTS labour_law_updates (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                release_date DATE NOT NULL,
                end_date DATE,
                is_visible BOOLEAN DEFAULT TRUE,
                speaker_name VARCHAR(255),
                speaker_role VARCHAR(255),
                speaker_org VARCHAR(255),
                speaker_image TEXT,
                documents JSONB,
                videos JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            -- Seed default categories for services if not exists
            INSERT INTO settings (key, value)
            VALUES ('service_categories', '["Labor law Compliance", "Audit & Verification", "Licensing & Registration", "Industrial Relations", "Payroll & Remittances"]')
            ON CONFLICT (key) DO NOTHING;
        `);

        console.log('All Admin Database tables initialized successfully.');
    } catch (err) {
        console.error('Error initializing Admin Database:', err);
    }
};

// function exported for use in index.ts
export default initAdminDb;
