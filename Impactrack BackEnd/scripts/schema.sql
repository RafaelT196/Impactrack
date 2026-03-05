-- Impactrack - Script de criação do banco (MySQL/MariaDB)
-- Execute no DBeaver após criar o banco de dados "impactrack"

-- Tabela de empresas (cadastro pelo Admin + flag de destaque)
CREATE TABLE IF NOT EXISTS empresa (
    id                  BIGINT AUTO_INCREMENT PRIMARY KEY,
    name                VARCHAR(255) NOT NULL,
    description         TEXT,
    logo                VARCHAR(500),
    esg_score           INTEGER NOT NULL,
    environmental       INTEGER NOT NULL,
    social              INTEGER NOT NULL,
    governance          INTEGER NOT NULL,
    category            VARCHAR(100) NOT NULL,
    highlighted         BOOLEAN NOT NULL DEFAULT FALSE,
    criteria_emissions  VARCHAR(500),
    criteria_renewable  VARCHAR(500),
    criteria_diversity  VARCHAR(500),
    criteria_labor      VARCHAR(500),
    criteria_transparency VARCHAR(500),
    alerts_json         TEXT
);

-- Índice para listar empresas em destaque e na aba explorar
CREATE INDEX IF NOT EXISTS idx_empresa_highlighted ON empresa (highlighted);
