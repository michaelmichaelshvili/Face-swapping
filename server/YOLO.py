from keras.models import Model
from keras.layers import *
from preprocessing import def_image_shape


def yolo_v1(S=7, B=2, C=1):
    input = Input(shape=(*def_image_shape, 3), name="input")
    x = Conv2D(filters=64, kernel_size=(7, 7), strides=(2, 2), padding='same', activation=LeakyReLU(0.1))(input)
    x = MaxPooling2D(pool_size=(2, 2), strides=(2, 2))(x)

    x = Conv2D(filters=192, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)
    x = MaxPooling2D(pool_size=(2, 2), strides=(2, 2))(x)

    x = Conv2D(filters=128, kernel_size=(1, 1), activation=LeakyReLU(0.1))(x)
    x = Conv2D(filters=256, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)
    x = Conv2D(filters=256, kernel_size=(1, 1), activation=LeakyReLU(0.1))(x)
    x = Conv2D(filters=512, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)
    x = MaxPooling2D(pool_size=(2, 2), strides=(2, 2))(x)

    for i in range(4):
        x = Conv2D(filters=256, kernel_size=(1, 1), activation=LeakyReLU(0.1))(x)
        x = Conv2D(filters=512, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)

    x = Conv2D(filters=512, kernel_size=(1, 1), activation=LeakyReLU(0.1))(x)
    x = Conv2D(filters=1024, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)
    x = MaxPooling2D(pool_size=(2, 2), strides=(2, 2))(x)

    for i in range(2):
        x = Conv2D(filters=512, kernel_size=(1, 1), activation=LeakyReLU(0.1))(x)
        x = Conv2D(filters=1024, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)
    x = Conv2D(filters=1024, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)
    x = Conv2D(filters=1024, kernel_size=(3, 3), strides=(2, 2), padding='same', activation=LeakyReLU(0.1))(x)

    x = Conv2D(filters=1024, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)
    x = Conv2D(filters=1024, kernel_size=(3, 3), padding='same', activation=LeakyReLU(0.1))(x)

    x = Flatten()(x)
    x = Dense(4096, activation=LeakyReLU(0.1))(x)
    x = Dropout(0.5)(x)
    x = Dense((S * S) * (5 * B + C))(x)

    model = Model(inputs=input, outputs=x)

    print(model.summary())

    return model
if __name__ == '__main__':
    yolo_v1()
