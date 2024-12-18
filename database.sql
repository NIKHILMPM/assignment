PGDMP     /    )        
        |         
   assignment    15.4    15.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16622 
   assignment    DATABASE     }   CREATE DATABASE assignment WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_India.1252';
    DROP DATABASE assignment;
                postgres    false            �            1259    16633    report    TABLE        CREATE TABLE public.report (
    rid integer NOT NULL,
    uid integer,
    city character varying(250),
    city_data json
);
    DROP TABLE public.report;
       public         heap    postgres    false            �            1259    16632    report_rid_seq    SEQUENCE     �   CREATE SEQUENCE public.report_rid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.report_rid_seq;
       public          postgres    false    217            	           0    0    report_rid_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.report_rid_seq OWNED BY public.report.rid;
          public          postgres    false    216            �            1259    16624    users    TABLE     �   CREATE TABLE public.users (
    uid integer NOT NULL,
    username character varying(250),
    email character varying(250),
    password character varying(250)
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    16623    users_uid_seq    SEQUENCE     �   CREATE SEQUENCE public.users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.users_uid_seq;
       public          postgres    false    215            
           0    0    users_uid_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.users_uid_seq OWNED BY public.users.uid;
          public          postgres    false    214            k           2604    16636 
   report rid    DEFAULT     h   ALTER TABLE ONLY public.report ALTER COLUMN rid SET DEFAULT nextval('public.report_rid_seq'::regclass);
 9   ALTER TABLE public.report ALTER COLUMN rid DROP DEFAULT;
       public          postgres    false    216    217    217            j           2604    16627 	   users uid    DEFAULT     f   ALTER TABLE ONLY public.users ALTER COLUMN uid SET DEFAULT nextval('public.users_uid_seq'::regclass);
 8   ALTER TABLE public.users ALTER COLUMN uid DROP DEFAULT;
       public          postgres    false    215    214    215                      0    16633    report 
   TABLE DATA           ;   COPY public.report (rid, uid, city, city_data) FROM stdin;
    public          postgres    false    217                     0    16624    users 
   TABLE DATA           ?   COPY public.users (uid, username, email, password) FROM stdin;
    public          postgres    false    215   �                  0    0    report_rid_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.report_rid_seq', 11, true);
          public          postgres    false    216                       0    0    users_uid_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_uid_seq', 5, true);
          public          postgres    false    214            o           2606    16640    report report_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_pkey PRIMARY KEY (rid);
 <   ALTER TABLE ONLY public.report DROP CONSTRAINT report_pkey;
       public            postgres    false    217            m           2606    16631    users users_pkey 
   CONSTRAINT     O   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (uid);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    215            p           2606    16641    report report_uid_fkey    FK CONSTRAINT     r   ALTER TABLE ONLY public.report
    ADD CONSTRAINT report_uid_fkey FOREIGN KEY (uid) REFERENCES public.users(uid);
 @   ALTER TABLE ONLY public.report DROP CONSTRAINT report_uid_fkey;
       public          postgres    false    3181    217    215               �  x��[s�6���_��lc	��yKӝm�n&��N��v42ȶ&�\���J�0�v���v�(�����Ç�:�fk�G/��S����f����3��92U�,U�	Wiĩ�i�(�B�T����fb>�1Ҝ�T'Li��Th(�4��>'�lQ���!1��l�r��j��,�j�<a�"e�G��"�t��i^mL-�� �x�1�䷇	[�pi�C�w]��yH�|�1��c9@�&,�diu;b�1�P���K  ߸���Œ�4/����\3�/�$��tD/]<if��<_e�dF��2����<eV(�	O�=g�uV&3g �U� .~�!  ��1��d�%I�b�[*���e��e��+��j�KnT<�H�bL]�nFl!��3��s��1ީs�$˲�!��v�Wf�.pY$<�����E���jp�X������⁨��s5��3>��f�j�DT#�
������.�����ؑ��E�mNs�bn\$L��D�u��{�7P�&n���� n�{��탽I5Q�����pC7�ԃ{�X������l�7d�%	��}d�8�[8C:8߾���8���3]��=<�-�K�i�]��{�
j\Ju61R�"����+!�_]|�hq�tdJ��vN����Jܭ�����汅��0�[��/��
)Vl�Q��a�����գ���e���:��q��X�d���bM*�aCe�F[n�_�q:���� ��-����s���u��;�ߟ���٧
�8;��O�;�޽�@�ⶑ����?3����lm+����VړTd3�##5���x��Ȉ����*#�O��co�A{�E�t���.�qk���Lk����"�G��:|d��UA���P7ybm��u�ޑ�C�dj��Ay�,��`��U��������0�PW>+�p�@�q��p�t�3�w�l{߄p\V�ѫ����iZ�q�M9p������~Cp�|�΁��p��� ��o�*f�oJ�a�	?H����Cۤ�@�dk���B��"/�׶-��;ƞ�*�v���@�.�(��� V �����+��%��P4ȒdK�Vbv��_5��G�S��K��f��@�������ݶ�������ֺ��О����p�v�i�����tT�          �   x�e�Kr�0  �59�ɐ]��)��*L7�B!�O�w�n\���a-�gWy��P�w�\\���BU�Ӆ�TYe-�8Oߒ�5�.R37,��0�9�H�6��&-��80s��hzOI`������3���z��M�qr��ZG3��Qk;�}�B�g;��钐��vs$�߅�~�����}��!2��i��AU�j��E'�i���.�D�y���ŗ��X�O �djh�     