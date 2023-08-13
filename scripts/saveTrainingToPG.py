import pandas as pd
from sqlalchemy import create_engine
from faker import Faker

faker = Faker()

df = pd.read_csv('/Volumes/Hyundai 1/dev/rxmz/Javascript/gptapi/scripts/cv-corpus-14.0-delta-2023-06-23/pt/validated.tsv', sep='\t')

connect_alchemy = "postgresql+psycopg2://%s:%s@%s/%s" % (
    "postgres",
    "1234",
    "localhost",
    "mlVoiceTraining"
)

engine = create_engine(connect_alchemy)

tablename = 'voices' 

names_id = {}
names = []
for id_registro in df['client_id']:
    if id_registro in names_id:
        names.append(names_id[id_registro])
    else:
        fake_name = faker.name()
        names_id[id_registro] = fake_name
        names.append(fake_name)

df['name'] = names

df.to_sql(tablename, con=engine, index=False, if_exists='replace', chunksize = 1000, schema='mlVoiceTraining')

print('DataFrame salvo no PostgreSQL com sucesso!')



