"""empty message

Revision ID: 1289ac23261a
Revises: 3d95b73f1220
Create Date: 2020-08-02 19:21:58.281365

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1289ac23261a'
down_revision = '3d95b73f1220'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('phone_no', sa.String(length=140), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'phone_no')
    # ### end Alembic commands ###