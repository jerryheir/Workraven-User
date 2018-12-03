package com.workravenuser;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.arttitude360.reactnative.rnpaystack.RNPaystackPackage;
import com.amazonaws.RNAWSCognitoPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.amazonaws.amplify.pushnotification.RNPushNotificationPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNPaystackPackage(),
            new RNAWSCognitoPackage(),
            new MapsPackage(),
            new RNPushNotificationPackage(),
            new ReactNativePushNotificationPackage(),
            new RNFetchBlobPackage(),
            new PickerPackage(),
            new VectorIconsPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
